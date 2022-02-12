import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'create', component: FormComponent},
  {path: 'news/:id', component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
