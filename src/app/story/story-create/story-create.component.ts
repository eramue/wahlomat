import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Story } from '../story.model';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-create',
  templateUrl: './story-create.component.html',
  styleUrls: ['./story-create.component.css'],
})
export class StoryCreateComponent implements OnInit {
  private mode = 'create';
  private storyId: string;
  story: Story;
  parties: string[];
  constructor(
    public route: ActivatedRoute,
    public storyService: StoryService
  ) {}

  ngOnInit(): void {
    this.parties=  this.storyService.getParties();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('storyId')) {
        console.log("editing....");
        this.mode = 'edit';
        this.storyId = paramMap.get('storyId');
       // this.storyService.getStory(this.storyId).subscribe((storyData) => {
       //   this.story = {id:storyData.id, question: storyData.question, answers: storyData.answers};
       // });
       this.story = this.storyService.getStory(this.storyId);
      } else {
        console.log("creating....");
        this.mode = 'create';
        this.storyId = null;
      }
    });
  }

  onAddStory(form: NgForm) {
    if (!form.valid) {
      return;
    }
    if (this.mode == 'create') {
      const newStory: Story = {
        id: null,
        thema: form.value.thema,
        question: form.value.question,
        answers: [],
      };
      this.parties.forEach((e, i) => {
        newStory.answers[i] = eval("form.value.answers" + i);
        //newStory[i] = window['form.value.answers'+i];
      });
      this.story = newStory;
      //this.storyService.addStory(form.value.question, form.value.answers);
      this.storyService.addStory2(newStory);
      form.resetForm();
    } else {
      // this.postsService.updatePost(this.storyId,form.value.question, form.value.answer);
    }
  }
}
