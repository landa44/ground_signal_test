import React from "react";


export default function CloseButton({handleClick}) {
  return (
    <button type="button" class="fixed right-0 rounded p-2 items-center text-gray-400 hover:bg-red-500" onClick={handleClick}>
      <span class="sr-only">Close menu</span>
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
