import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AuthStoreModule} from './auth-store/auth-store.module'
import {SharedStoreModule} from './shared-store/shared-store.module'
import {BlogStoreModule} from './blog-store/blog-store.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthStoreModule, SharedStoreModule, BlogStoreModule],
})
export class AppStoreModule {}
