import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Story } from './story.model';

@Injectable({ providedIn: 'root' })
export class StoryService {
  private stories: Story[] = [];
  private storiesUpdated = new Subject<Story[]>();

  constructor(private router: Router) {}

  getParties() {
    return ['SPD', 'CDU', 'Gruene', 'FDP','Linke', 'AFD'];
  }

  getStories() {
    return [...this.stories];
  }

  getStory(id: String) {
    return {...this.stories.find(s => s.id == id)};
   // return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  getStoryUpdateListener() {
    return this.storiesUpdated.asObservable();
  }

  addStory(question: string, thema: string, answers: string[]) {
    const story: Story = { question: question, thema: thema, answers: answers,  id: null };
    this.stories.push(story);
    this.storiesUpdated.next([...this.stories]);
    this.router.navigate(['/story']);
  }

  addStory2(story: Story) {
    this.stories.push(story);
    this.storiesUpdated.next([...this.stories]);
    this.router.navigate(['/story']);
  }

  deletePost(id: String) {
    console.log('delete', id);
  }
}
