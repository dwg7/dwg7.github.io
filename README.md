# dwg7.github.io

DWG7(UN Open GIS Initiative)の組織トップページ。`docs/index.md`がGitHub Pagesで
`https://dwg7.github.io/`として公開される。

## 経緯

[UNopenGIS/7#996](https://github.com/UNopenGIS/7/issues/996)——GitHub Pagesへのアクセスが
制限される環境向けにdwg7.unopengis.orgをCNAME設定する提案——のやり取りの中で、
`https://dwg7.github.io/`自体にトップページが存在しない(404)ことが判明した。各プロジェクト
(`dwg7.github.io/<repo>/`)は個別にPagesを持つが、それらへの入り口となる索引が無かった。

## 運用

- **公開ページの言語は英語**(国際的な読み手を想定)。このREADME/CLAUDE.mdは内部向けなので日本語。
- `docs/index.md`は、dwg7配下でGitHub Pagesが有効な各リポジトリ(`has_pages: true`)のうち、
  対外的な訴求力があるものを選んで一覧化したもの。全件を機械的に載せるのではなく、
  実際にアクセス可能か(HTTP 200)・内容が対外的に見せるに値するかを確認した上で選定する
  (詳細は[CLAUDE.md](CLAUDE.md)参照)。
- 更新はおおむね週1回程度を想定。claude-mct(hfuさんのClaude Codeフリートの一員)が
  定期的に見直しを担当する。

## 関連

- [UNopenGIS/7#996](https://github.com/UNopenGIS/7/issues/996)
- [dwg7 organization](https://github.com/dwg7)
