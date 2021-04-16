import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Vote } from './vote.model';
import { Story } from '../story/story.model';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private votes: Vote[] = [];
  private votesUpdated = new Subject<Vote[]>();

  constructor(private http: HttpClient, private router: Router) {
    let newVote: Vote = {
      id: '1',
      user: 'Rainer',
      story: {
        id: '11',
        thema: 'Klima',
        question: 'menschengemacht?',
        answers: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'],
      },
      values: [2, 0, 0, 0, 0, 0],
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
      values: [0, 0, 0, 2, 1, 0],
    };
    this.votes.push(newVote2);
  }

  getVotes() {
    this.http
      .get<{ message: String; votes: any[] }>('http://localhost:3001/api/vote')
      .pipe(
        map((voteData) => {
          return voteData.votes.map((data) => {
            return {
              id: data._id,
              user: data.user,
              story: {
                id: data.scenario._id,
                thema: data.scenario.subject,
                question: data.scenario.question,
                answers: data.scenario.answers,
              },
              values: data.values,
            };
          });
        })
      )
      .subscribe((transformedPost) => {
        this.votes = transformedPost;
        this.votesUpdated.next([...this.votes]);
      });
    return [...this.votes];
  }

  getVote(id: String) {
    return { ...this.votes.find((s) => s.id == id) };
    // return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  getVoteUpdateListener() {
    return this.votesUpdated.asObservable();
  }

  addVote(user: string, story: Story, values: number[]) {
    const vote: Vote = { user: user, story: story, values: values, id: null };
    this.votes.push(vote);
    this.votesUpdated.next([...this.votes]);
    this.router.navigate(['/vote']);
  }

  addVote2(vote: Vote) {
    this.http
      .post<{ message: string; voteId: string }>(
        'http://localhost:3001/api/vote',
        vote
      )
      .subscribe((voteData) => {
        console.log(voteData.message);
        vote.id = voteData.voteId;
        this.votes.push(vote);
        this.votesUpdated.next([...this.votes]);
        this.router.navigate(['/vote']);
      });
  }

  deleteVote(id: string) {
    console.log('delete', id);
    this.http.delete('http://localhost:3001/api/vote/' + id).subscribe(() => {
      console.log('deleted vote with id=' + id);
      this.votes = this.votes.filter((vote) => vote.id !== id);
      this.votesUpdated.next([...this.votes]);
    });
  }
}
