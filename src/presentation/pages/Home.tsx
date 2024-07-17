import DropForm from '../import/components/DropForm'
import RecentReports from '../import/components/RecentReports'

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto mt-10">
        {/* ファイルのインポート */}
        <DropForm />

        {/* 最近使用したデータリスト */}
        <div className="w-full max-w-lg rounded-lg p-4 pt-8">
          <h3 className="text-lg font-semibold mb-1">最近使用したデータ</h3>
          <RecentReports />
        </div>
      </div>
    </>
  )
}

export default Home
