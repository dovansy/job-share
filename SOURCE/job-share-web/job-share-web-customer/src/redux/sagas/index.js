import { watchLoginRecruitment } from './NetworkSaga'

export default function* rootSaga() {
  yield watchLoginRecruitment
}
