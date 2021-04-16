import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Story } from './story.model';

@Injectable({ providedIn: 'root' })
export class StoryService {
  private stories: Story[] = [];
  private storiesUpdated = new Subject<Story[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getParties() {
    return ['SPD', 'CDU', 'Gruene', 'FDP', 'Linke', 'AFD'];
  }

  getStories() {
   // return [...this.stories];
    this.http.get<{message: String, stories: any[]}>('http://localhost:3001/api/story')
    .pipe(map((storyData) => {
      return storyData.stories.map((data) => {
        return {
          id:data._id,
          thema: data.subject,
          question: data.question,
          answers: data.answers,
        }
      });
    }))
    .subscribe((transformedPost) => {
     this.stories= transformedPost;
     this.storiesUpdated.next([...this.stories]);
    });

  }

  getStory(id: String) {
    return { ...this.stories.find((s) => s.id == id) };
    // return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  getStoryUpdateListener() {
    return this.storiesUpdated.asObservable();
  }

  addStory(question: string, thema: string, answers: string[]) {
    const story: Story = {
      question: question,
      thema: thema,
      answers: answers,
      id: null,
    };
    this.stories.push(story);
    this.storiesUpdated.next([...this.stories]);
    this.router.navigate(['/story']);
  }

  addStory2(story: Story) {
    this.http
      .post<{ message: string; storyId: string }>(
        'http://localhost:3001/api/story',
        story
      )
      .subscribe((storyData) => {
        console.log(storyData.message);
        story.id = storyData.storyId;
        this.stories.push(story);
        this.storiesUpdated.next([...this.stories]);
        this.router.navigate(['/story']);
      });
  }

  deletePost(id: string) {
    console.log('delete', id);
    this.http.delete('http://localhost:3001/api/story/' +id).subscribe(() => {
      console.log("deleted story with id=" + id);
      this.stories = this.stories.filter(story => story.id !== id);
      this.storiesUpdated.next([...this.stories]);
    })
  }
}
