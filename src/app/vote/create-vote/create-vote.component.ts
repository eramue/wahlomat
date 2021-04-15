import { rendererTypeName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoteService } from 'src/app/vote/vote.service';
import { Vote } from 'src/app/vote/vote.model';
import { Story } from '../../story/story.model';
import { StoryService } from 'src/app/story/story.service';

@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.css'],
})
export class CreateVoteComponent implements OnInit {
  @Input() votes: Vote[] = [];
  user : string = 'Rainer'
  checked = false;
  showParty: boolean= false;
  parties: string[];
  voteHeaderStyles: { 'font-style': string; 'font-weight': string; 'color': string; };
  maxVotes: number=5;
  constructor(public voteService: VoteService, public storyService: StoryService, private router: Router) {
    this.parties = this.storyService.getParties();
  }

  ngOnInit(): void {
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

  toggleShowParty(id: string) {
    this.showParty= !this.showParty;
  }

  getLabel(pos: number, party: string) {
    if (this.showParty) {
      return party;
    } else {
      return 'Antwort ' + pos;
     // return 'Antwort ' + pos + "("+this.votes[0].values[pos] +")";
    }
  }

  setVoteHeaderStyles(vote: Vote) {
   const sum = vote.values.reduce((sum, current) => sum + current, 0);
    this.voteHeaderStyles = {
      'font-style':    sum==0 || sum== this.maxVotes    ? 'normal' : 'italic',
      'font-weight': sum== this.maxVotes ? 'bold'   : 'normal',
      'color': sum> this.maxVotes ? 'red' : 'black'
    };
  }

  getVotesSum(vote: Vote) {
    return vote.values.reduce((sum, current) => sum + current, 0);
   }

   submitVoting() {
    console.log("voting finished.");
  //  this.voteService.addVote2(newVote);
    this.router.navigate(['/vote/eval']);
   }

   areAllVotesDone() {
     return this.votes.every((v) => this.getVotesSum(v)==this.maxVotes);
   }
   atleastOnePointPerVote() {

    return this.votes.every((v) => this.getVotesSum(v)>0 && this.getVotesSum(v)<=this.maxVotes);
   }
}
