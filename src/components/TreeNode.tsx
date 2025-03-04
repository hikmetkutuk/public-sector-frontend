'use client';
import { SquareMinus, SquarePlus, Folder, FolderOpen } from 'lucide-react';
import React, { useState } from 'react';
import { OrganizationNode } from '@/types';

const TreeNodeComponent = ({ node }: { node: OrganizationNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="mb-2">
      <div
        className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            {isOpen ? <SquareMinus size={16} /> : <SquarePlus size={16} />}
          </span>
        )}
        <span className="flex items-center text-yellow-600 dark:text-yellow-600">
          {hasChildren ? (
            isOpen ? (
              <FolderOpen size={16} />
            ) : (
              <Folder size={16} fill="currentColor" />
            )
          ) : (
            <Folder size={16} fill="currentColor" className="ml-6" />
          )}
        </span>
        <span className="flex items-center text-gray-800 dark:text-white">{node.name}</span>
      </div>
      {hasChildren && isOpen && (
        <div className="ml-10">
          {node.children!.map((child: OrganizationNode) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

TreeNodeComponent.displayName = 'TreeNode';

export const TreeNode = React.memo(
  TreeNodeComponent,
  (prevProps, nextProps) => prevProps.node === nextProps.node
);
