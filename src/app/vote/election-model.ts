import { Story } from "../story/story.model";

export interface Vote
 {
  name: string;
  votes: string;
  story: Story;
  value: number[];
}
