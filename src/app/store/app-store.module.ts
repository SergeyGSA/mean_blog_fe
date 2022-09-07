import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AuthStoreModule} from 'src/app/store/auth-store/auth-store.module'
import {SharedStoreModule} from 'src/app/store/shared-store/shared-store.module'
import {BlogStoreModule} from 'src/app/store/blog-store/blog-store.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthStoreModule, SharedStoreModule, BlogStoreModule],
})
export class AppStoreModule {}
