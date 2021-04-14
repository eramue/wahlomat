import { Story } from '../story/story.model';
export interface Vote
 {
  id: string;
  user: string;
  story: Story;
  values: number[];
}
