import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { VoteService } from '../vote.service';
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
  columnsToDisplay: string[] =['SPD', 'CDU', 'Gruene', 'FDP', 'Linke', 'AFD'];
  expandedElement: Vote | null;
  dataSource: Vote[] = initVotes;
  constructor(public voteService: VoteService) {}

  ngOnInit(): void {
    //this.dataSource = this.voteService.getVotes();
    console.log('got votes.');
  }
}

const initVotes: Vote[] = [
  {
    id: '1',
    user: 'Rainer',
    story: {
      id: '11',
      thema: 'Klima',
      question: 'menschengemacht?',
      answers: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'],
    },
    values: [2, 0, 0, 0, 0, 0],
  },
  {
    id: '2',
    user: 'Rainer',
    story: {
      id: '12',
      thema: 'Corona',
      question: 'wie ist der Virus ausgebrochen?',
      answers: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'],
    },
    values: [0, 0, 0, 2, 1, 0],
  },
];
