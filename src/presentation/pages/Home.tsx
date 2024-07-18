import DropForm from '../import/components/DropForm'
import RecentReports from '../import/components/RecentReports'

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto mt-10">
        {/* ファイルのインポート */}
        <DropForm />

        {/* 最近使用したデータリスト */}
        <RecentReports />
      </div>
    </>
  )
}

export default Home
