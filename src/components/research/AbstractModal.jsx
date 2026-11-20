// src/components/research/AbstractModal.jsx
import { Modal } from "../ui/Modal";
import { HighlightedText } from "./HighlightedText";

export function AbstractModal({ isOpen, abstract, query = "", onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Full Abstract">
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        <HighlightedText text={abstract} query={query} />
      </p>
    </Modal>
  );
}
