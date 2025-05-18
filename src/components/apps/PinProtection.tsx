import React, { useState } from 'react';
import { createSession } from '@/lib/session';

interface Props {
  correctPin: string;
  onSuccess: () => void;
}

export const PinProtection: React.FC<Props> = ({ correctPin, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin) {
      createSession();
      onSuccess();
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="glass p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Enter PIN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setError(false);
                setPin(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="• • • • • •"
              autoComplete="off"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">Incorrect PIN. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}; 