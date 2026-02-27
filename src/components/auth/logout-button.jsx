'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Loader } from 'lucide-react';
import { logoutUserAction } from '@/lib/actions';
import { useFirestore, useUser } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const db = useFirestore();
  const { user } = useUser();

  const handleLogout = () => {
    startTransition(async () => {
       if (user) {
          try {
            // We await the status update to ensure it hits the server 
            // before the auth session is invalidated.
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { status: 'offline' });
          } catch (e) {
            // If it fails (e.g. no connection), we still want to log out
            console.error('Failed to mark user as offline:', e);
          }
       }

       try {
         const { auth } = initializeFirebase();
         await signOut(auth);
         await logoutUserAction();
       } catch (e) {
         console.error('Logout error:', e);
       }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Logout
    </Button>
  );
}
