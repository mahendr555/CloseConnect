'use client';

import Avatar from '@/app/components/Avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from './ImageModal';

interface MessageBoxProps {
  isLast: boolean;
  data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== session?.data?.user?.email)
    .map((user) => user.name)
    .join(', ');

  // Dynamic class assignment for styling
  const containerClass = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatarClass = clsx(isOwn && 'order-2');
  const bodyClass = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const messageClass = clsx(
    'text-sm w-fit overflow-hidden shadow-md',
    isOwn ? 'bg-cyan-500 text-white' : 'bg-gray-100',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );

  return (
    <div className={containerClass}>
      {/* Avatar */}
      <div className={avatarClass}>
        <Avatar user={data.sender} />
      </div>

      {/* Message body */}
      <div className={bodyClass}>
        {/* Sender info */}
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500 font-semibold">
            {data.sender?.name || data.sender?.email}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>

        {/* Message content */}
        <div className={messageClass}>
          <ImageModal
            isOpen={isImageModalOpen}
            src={data.image}
            onClose={() => setIsImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setIsImageModalOpen(true)}
              src={data.image}
              width={288}
              height={288}
              alt="Sent Image"
              className="object-cover cursor-pointer transition-transform transform hover:scale-110"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>

        {/* Seen List */}
        {isLast && isOwn && seenList && (
          <div className="text-xs font-light text-gray-500 mt-1">
            Seen by {seenList}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
