import Container from '../classification/components/Container'

// ページ名称については検討の余地あり
const Classification = () => {
  return (
    <>
      <h1>Classification Page</h1>
      <p>評価対象のフォルダがインポートされたら、遷移されてくるページ</p>
      {/* 学生と提出物がインポートされたかを確認している */}
      <Container />
    </>
  )
}

export default Classification
