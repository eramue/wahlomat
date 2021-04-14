import { CreateVoteComponent } from './vote/create-vote/create-vote.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryCreateComponent } from './story/story-create/story-create.component';
import { StoryListComponent } from './story/story-list/story-list.component';
import { EvalVoteComponent } from './vote/eval-vote/eval-vote.component';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  { path: 'story', component: StoryListComponent },
  { path: 'story/create', component: StoryCreateComponent },
  { path: 'story/edit/:storyId', component: StoryListComponent },
  { path: 'vote', component: CreateVoteComponent },
  { path: 'vote/create', component: CreateVoteComponent },
  { path: 'vote/eval', component: EvalVoteComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
