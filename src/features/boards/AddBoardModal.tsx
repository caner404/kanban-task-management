import { Button } from '@components/Button';
import Modal from '@components/Modal';
import React from 'react';
import { AddBoardForm } from './AddBoardForm';
import { Board } from './types';

export function AddBoardModal({
  children,
  board,
}: {
  children?: React.ReactNode;
  board?: Board;
}) {
  return (
    <div>
      <Modal.Root>
        <Modal.Open opens="board-form">
          {children || <Button name="addBoardBtn">+ add a board</Button>}
        </Modal.Open>
        <Modal.Window name="board-form">
          <AddBoardForm editBoard={board} />
        </Modal.Window>
      </Modal.Root>
    </div>
  );
}
