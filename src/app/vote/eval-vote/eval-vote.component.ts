import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { VoteService } from '../vote.service';
import {StoryService } from '../../story/story.service';
import { Vote } from '../vote.model';
import { Story } from 'src/app/story/story.model';

@Component({
  selector: 'app-eval-vote',
  templateUrl: './eval-vote.component.html',
  styleUrls: ['./eval-vote.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class EvalVoteComponent implements OnInit {
  columnsToDisplay: string[];
  columnsToDisplayExpanded: string[];
  parties: string[];
  partiesExpanded: string[];
  expandedElement: Vote | null;
  votes: Vote[] = [];
  totals: number[] = [];
  /** maps the parties to a rank (in terms of total of their value votes).
   * e.g. if parties[0] = SPD, then rank[0]=3 means, that SPD has rank 3
   */
   partyToRank: number[] = [];
   /** maps rank to a party index of party array
   */
   rank: number[] = [];
  constructor(public voteService: VoteService, public storyService: StoryService) {}

  ngOnInit(): void {
    this.votes = this.voteService.getVotes();
    this.parties = this.storyService.getParties();
    this.columnsToDisplay= ["Story"].concat(this.parties);
    this.partiesExpanded = this.parties.map((c) => c + "Expanded");
    this.columnsToDisplayExpanded = ["StoryExpanded"].concat(this.partiesExpanded);
    this.doVoteCalculation();
    console.log('votes initialized.');
  }

  getTotalValues(i:number) {
    return this.totals[i];
  }
  doVoteCalculation() {
    let posValueMap= [];
    for (let i = 0; i < this.parties.length; i++) {
     this.totals[i] = this.votes.map(v =>v.values[i]).reduce((acc, value) => acc + value, 0);
     posValueMap.push({id:i, total: this.totals[i] });
    }
    let sortedValues = posValueMap.sort((first, second) => 0 - (first.total > second.total ? 1 : -1));
    for (let i = 0; i < this.parties.length; i++) {
      this.partyToRank[sortedValues[i].id]=i+1;
      this.rank[i]=sortedValues[i].id
    }
  }

}
