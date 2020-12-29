import { watchGetUser, watchGetListCompany } from './NetworkSaga'

export default function* rootSaga() {
  yield watchGetUser
  yield watchGetListCompany
}
