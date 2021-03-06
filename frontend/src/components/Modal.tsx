import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalHolder = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalMask = styled.div`
  border-radius: 8px;
  padding: 20px 16px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.075);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-height: 384px;
  width: 375px;
  line-height: 25.2px;
`;
export const ModalMaskHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: inherit;
  height: 100%;
  color: #000;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
`;

const ModalTitle = styled.h3`
  flex: 1;
`;

const ModalCloseButton = styled.button`
  all: unset;
  color: #000;
  cursor: pointer;
`;

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onCancel: () => void;
}

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  onCancel,
}: ModalProps) => {
  return ReactDOM.createPortal(
    <ModalHolder>
      <ModalMaskHolder>
        <ModalMask>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalCloseButton onClick={onCancel}>x</ModalCloseButton>
          </ModalHeader>
          {children}
        </ModalMask>
      </ModalMaskHolder>
    </ModalHolder>,
    modalRoot!
  );
};
