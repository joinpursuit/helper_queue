export interface PropsChildren {
    children: React.ReactNode
}


export interface User {
  email: string | null;
  uid: string;
  id?: string;
  lastLogin?: string;
  token?: string | null;
  socket_id?: string;
}

export interface Ticket {
  class: string;
  email: string;
  created_at: string | number;
  id: string;
  uid?: string;
  socket_id: string;
  lastLogin: string;
}
