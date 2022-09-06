import { render, screen, RenderResult, fireEvent, getByRole } from '@testing-library/react'
import Input from './Input'

//describeで処理をまとめる
describe('input', () => {
  let renderResult: RenderResult

  //それぞれのテストケース前にコンポーネントを描画し、renderResultにセットする
  beforeEach(() => {
    renderResult = render(<Input id='username' label='UserName' />)
  })

  //テストケース実行後に描画していたコンポーネントを解放する
  afterEach(() => {
    renderResult.unmount()
  })

  //初期描画時にinput要素が空であることをテスト
  it('should empty in input on initial render', () => {
    //labelがUserNameであるコンポーネントに対応するinput要素を取得する
    //(label要素を使用しない場合はarea - labelを指定することでも要素を取得できる)
    const inputNode = screen.getByLabelText('UserName') as HTMLInputElement

    //input要素の表示が空か確認する
    expect(inputNode).toHaveValue('')
  })

  //文字を入力したら、入力した内容が表示されるかをテスト
  it('should show input text', () => {
    const inputText = 'test Input text'
    const inputNode = screen.getByLabelText('UserName') as HTMLInputElement

    //fireEventを使って、input要素のonChangeイベントを発火する
    fireEvent.change(inputNode, { target: { value: inputText } })

    //input要素に入力したテキストが表示されているか確認する。
    expect(inputNode).toHaveValue(inputText)
  })

  //ボタンが押されたら、入力テキストがクリアするかチェック
  it('should reset when user clicks button', () => {
    //最初にinputにテキストを入力
    const inputText = 'Test Input Text'
    const inputNode = screen.getByLabelText('UserName') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: inputText } })

    //ボタンを取得
    const buttonNode = screen.getByRole('button', {
      name: 'Reset',
    }) as HTMLButtonElement
    //ボタンをクリック
    fireEvent.click(buttonNode)

    //input要素の表示が空か確認する
    expect(inputNode).toHaveValue('')
  })
})

/**
 * テスト結果
 > next-ts@0.1.0 test
 > jest

  info  - Loaded env from /Users/macbookair/dev/nextjs/next-ts/.env
  info  - SWC minify release candidate enabled. https://nextjs.link/swcmin
  info  - SWC minify release candidate enabled. https://nextjs.link/swcmin
  PASS  src/components/Input.spec.tsx
    input
      ✓ should empty in input on initial render (17 ms)
      ✓ should show input text (9 ms)
      ✓ should reset when user clicks button (27 ms)

  Test Suites: 1 passed, 1 total
  Tests:       3 passed, 3 total
  Snapshots:   0 total
  Time:        0.917 s, estimated 1 s
  Ran all test suites.
 */
