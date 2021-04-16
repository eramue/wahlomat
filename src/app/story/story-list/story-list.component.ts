import { StoryService } from './../story.service';
import { Story } from './../story.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  private subscription: Subscription;
  parties: string[];

  constructor(public storyService: StoryService, private router: Router) {
    console.log('url: ', router.url);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.parties=  this.storyService.getParties();

    this.subscription = this.storyService
      .getStoryUpdateListener()
      .subscribe((stories: Story[]) => {
        this.stories = stories;
      });

    //after creating subscription, trigger it for initial load
    this.storyService.getStories();
  }

  onDelete(id: string) {
    this.storyService.deletePost(id);
  }

}
