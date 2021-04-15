import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Vote } from './vote.model';
import { Story } from '../story/story.model';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private votes: Vote[] = [];
  private votesUpdated = new Subject<Vote[]>();

  constructor(private router: Router) {
    let newVote: Vote = {
      id: '1',
      user: 'Rainer',
      story: {
        id: '11',
        thema: 'Klima',
        question: 'menschengemacht?',
        answers: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'],
      },
      values: [2,0,0,0,0,0],
    };
    this.votes.push(newVote);
    let newVote2: Vote = {
      id: '2',
      user: 'Rainer',
      story: {
        id: '12',
        thema: 'Corona',
        question: 'wie ist der Virus ausgebrochen?',
        answers: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'],
      },
      values: [0,0,0,2,1,0],
    };
    this.votes.push(newVote2);
  }

  getVotes() {
    return [...this.votes];
  }

  getVote(id: String) {
    return {...this.votes.find(s => s.id == id)};
   // return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  getVoteUpdateListener() {
    return this.votesUpdated.asObservable();
  }

  addVote(user: string, story: Story, values: number[]) {
    const vote: Vote = { user: user, story: story, values: values,  id: null };
    this.votes.push(vote);
    this.votesUpdated.next([...this.votes]);
    this.router.navigate(['/vote']);
  }

  addVote2(vote: Vote) {
    this.votes.push(vote);
    this.votesUpdated.next([...this.votes]);
    this.router.navigate(['/vote']);
  }

  deleteVote(id: Vote) {
    console.log('delete', id);
  }
}
