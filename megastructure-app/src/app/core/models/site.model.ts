export interface Site {
  id: string;
  name: string;
  type: string;
  owner: string;
  managers: [string];
  lastModified: { date: Date; user: string };
}
