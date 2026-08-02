// Default task definitions — seeded to Blob when empty.

export type Platform = string;
export type TaskType = string;

export interface Task {
  id: string;
  platform: Platform;
  type: TaskType;
  title: string;
  basePoints: number;
  url: string;
  instructions: string;
  limit?: number;
  count?: number;
}

export const defaultTasks: Task[] = [
  {
    id: "257835",
    platform: "Instagram",
    type: "Follow",
    title: "Follow @myfreefollower on Instagram",
    basePoints: 32,
    url: "https://instagram.com/myfreefollower",
    instructions:
      "Open the profile, tap Follow, and upload a screenshot showing the Following button. Keep the follow for at least 7 days.",
    limit: 500,
  },
  {
    id: "257836",
    platform: "TikTok",
    type: "App Install",
    title: "Install & open the partner app (TikTok offer)",
    basePoints: 45,
    url: "https://www.tiktok.com",
    instructions:
      "Install the app from the store link, open it once, and submit a screenshot of the home screen with today's date visible.",
    limit: 200,
  },
  {
    id: "257837",
    platform: "Google",
    type: "Survey",
    title: "Complete a 3-minute consumer survey",
    basePoints: 50,
    url: "https://forms.gle/example-survey",
    instructions:
      "Answer all survey questions honestly. Submit a screenshot of the thank-you page at the end.",
    limit: 150,
  },
  {
    id: "257838",
    platform: "YouTube",
    type: "Video Watch",
    title: "Watch our YouTube video for 60 seconds",
    basePoints: 24,
    url: "https://youtube.com/@myfreefollower",
    instructions:
      "Play the featured video for at least 60 seconds (unmuted). Screenshot the player showing progress past 1:00.",
    limit: 1000,
  },
  {
    id: "257839",
    platform: "Facebook",
    type: "Share Post",
    title: "Share our Facebook post to your timeline",
    basePoints: 28,
    url: "https://facebook.com/myfreefollower",
    instructions:
      "Share the pinned post publicly on your timeline. Upload a screenshot of the shared post on your profile.",
    limit: 300,
  },
  {
    id: "257840",
    platform: "X (Twitter)",
    type: "Follow",
    title: "Follow @myfreefollower on X",
    basePoints: 30,
    url: "https://twitter.com/myfreefollower",
    instructions:
      "Follow the account and upload a screenshot showing the Following state on the profile page.",
    limit: 400,
  },
  {
    id: "257841",
    platform: "Instagram",
    type: "Like",
    title: "Like our latest Instagram post",
    basePoints: 22,
    url: "https://instagram.com/myfreefollower",
    instructions:
      "Like the most recent post on our profile. Screenshot must show the liked heart state.",
    limit: 800,
  },
];

export function findTask(id: string, tasks: Task[] = defaultTasks): Task | undefined {
  return tasks.find((t) => t.id === id);
}
