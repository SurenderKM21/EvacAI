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
       const profileId = sessionStorage.getItem('evacai_profile_id') || user?.uid;
       
       if (profileId) {
          try {
            // Mark the specific session profile as offline
            const userRef = doc(db, 'users', profileId);
            await updateDoc(userRef, { status: 'offline' });
          } catch (e) {
            console.error('Failed to mark user as offline:', e);
          }
       }

       try {
         // Clear session isolation data
         sessionStorage.removeItem('evacai_profile_id');
         
         const { auth } = initializeFirebase();
         // Only sign out of Firebase if no other tabs might be using it
         // For a prototype, we'll keep it simple and just redirect
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
