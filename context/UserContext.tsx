import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'driver' | 'club';
export type Mood = 'Cruising' | 'Racing' | 'Photoshoot' | 'Pit Stop';

export interface DriverProfile {
  role: 'driver';
  username: string;
  carMake: string;
  carModel: string;
  carPhoto?: string;
  modList: string;
  horsepower: string;
  mood: Mood;
}

export interface ClubProfile {
  role: 'club';
  clubName: string;
  clubDesc: string;
  clubLogo?: string;
  clubEmail: string;
  clubLinks: string;
  verified?: boolean;
  mood: Mood;
}

export type UserProfile = DriverProfile | ClubProfile | null;

export interface Friend {
  id: string;
  username: string;
  carPhoto?: string;
  mood: Mood;
}

interface UserContextProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  friends: Friend[];
  addFriend: (friend: Friend) => void;
  removeFriend: (id: string) => void;
  updateMood: (mood: Mood) => void;
  sendFriendRequest: (friend: Friend) => void;
  pendingRequests: Friend[];
  acceptFriendRequest: (id: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);

  const addFriend = (friend: Friend) => setFriends((prev) => [...prev, friend]);
  const removeFriend = (id: string) => setFriends((prev) => prev.filter(f => f.id !== id));
  const updateMood = (mood: Mood) => {
    if (!profile) return;
    setProfile({ ...profile, mood } as UserProfile);
  };
  const sendFriendRequest = (friend: Friend) => setPendingRequests((prev) => [...prev, friend]);
  const acceptFriendRequest = (id: string) => {
    const req = pendingRequests.find(f => f.id === id);
    if (req) {
      setFriends((prev) => [...prev, req]);
      setPendingRequests((prev) => prev.filter(f => f.id !== id));
    }
  };

  return (
    <UserContext.Provider value={{ profile, setProfile, friends, addFriend, removeFriend, updateMood, sendFriendRequest, pendingRequests, acceptFriendRequest }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}; 