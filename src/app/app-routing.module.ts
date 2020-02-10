import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./controller/login/login.module').then( m => m.LoginPageModule)},
  { path: 'home/:Cid', loadChildren: () => import('./controller/accueil/home.module').then( m => m.HomePageModule)},
  { path: 'profil', loadChildren: () => import('./controller/profil/profil.module').then( m => m.ProfilPageModule)},
  { path: 'settings', loadChildren: () => import('./controller/settings/settings.module').then( m => m.SettingsPageModule)},
  { path: 'feedbacks', loadChildren: () => import('./controller/feedbacks/feedback.module').then( m => m.FeedbackPageModule)},
  { path: 'finfo/:Fid', loadChildren: () => import('./controller/feedbacks/finfo/finfo.module').then( m => m.FinfoPageModule)},
  { path: 'fcreate', loadChildren: () => import('./controller/feedbacks/fcreate/fcreate.module').then( m => m.FcreatePageModule)},
  { path: 'questionnaires/:Cid/:Crole', loadChildren: () => import('./controller/questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule)},
  { path: 'qanswering/:Cid/:Qid', loadChildren: () => import('./controller/questionnaire/qanswering/qanswering.module').then( m => m.QinfoPageModule)},
  { path: 'qcreate/:Cid', loadChildren: () => import('./controller/questionnaire/qcreate/qcreate.module').then( m => m.QcreatePageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
