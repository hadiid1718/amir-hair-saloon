import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/** Renders its children inside an element of the booking navbar (found by id). */
export function HeaderPortal({ slotId, children }) {
  const [slot, setSlot] = useState(null);

  useEffect(() => {
    setSlot(document.getElementById(slotId));
  }, [slotId]);

  return slot ? createPortal(children, slot) : null;
}