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
- 掲載リストは`data/outputs.json`(掲載する、一言つき)と`data/excluded.json`(見送る、理由つき)
  に分けて管理する。`docs/index.md`はこの2ファイルから`scripts/build.mjs`が自動生成する
  (直接編集しない)。
- **週1回、GitHub Actions(`.github/workflows/weekly-refresh.yml`)が自動実行**される:
  1. `docs/index.md`を`data/outputs.json`から再生成し、変更があればcommit・push
  2. dwg7組織でGitHub Pagesが新たに有効になったリポジトリのうち、`outputs.json`/`excluded.json`
     どちらにも載っていないものを検出し、あれば掲載可否の判断を促すissueを1件だけ作成
     (既に未解決のissueがあれば重複作成しない)
- **人間(またはclaude-mct)が判断するのは、新規リポジトリの掲載可否だけ**。それ以外は自動化されている。
  判断基準は[CLAUDE.md](CLAUDE.md)参照。

## 関連

- [UNopenGIS/7#996](https://github.com/UNopenGIS/7/issues/996)
- [dwg7 organization](https://github.com/dwg7)
