import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects } from './blog.effects';
import { blogReducer } from './blog.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('blog', blogReducer),
    EffectsModule.forFeature([BlogEffects])
  ]
})
export class BlogStoreModule { }
