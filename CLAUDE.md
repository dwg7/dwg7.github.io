# CLAUDE.md

`docs/index.md`(公開ページ、英語)は`data/outputs.json`から`scripts/build.mjs`が自動生成する。
**`docs/index.md`を直接編集しない**——次回の自動実行で上書きされる。

## 用語

DWG7は "domain working group"(**discussion**ではない)。hfuさんから2026-09-06に訂正指示あり。

## 自動化されていること

`.github/workflows/weekly-refresh.yml`が毎週月曜03:00 UTC(`workflow_dispatch`で手動実行も可)に:

1. `node scripts/build.mjs`を実行し、`docs/index.md`を`data/outputs.json`から再生成。
   変更があればcommit・push
2. dwg7組織でGitHub Pagesが有効なリポジトリを列挙し、`data/outputs.json`にも
   `data/excluded.json`にも載っていない(＝掲載可否が未決定の)ものを検出
3. 未決定のものがあれば、`Curation needed: new Pages-enabled repos`というissueを1件作成
   (既に同種の未解決issueがあれば重複作成しない)

## 人間(またはclaude-mct)が判断すること

上記issueが作られたら、対象リポジトリについて以下を判断し、`data/outputs.json`
(掲載する場合、1行程度の英語の説明つき)か`data/excluded.json`(見送る場合、理由つき)に追記する:

- 対外的な訴求力があるか(国際的な読み手が見て価値を理解できるか)
- 「client test」「demo」など明らかに未完成・内部検証段階と分かる表示のものは、
  文脈上どうしても必要な場合(例: 特定の連携を裏付ける具体例)を除き基本的に見送る
- 内部向けツール(特定機関の職員向け等)や、GIS成果というより別領域(フリート運用等)の
  ものは、このページの主旨(DWG7の対外的な成果)からは外す
- 全件を機械的に載せるのではなく、多様性(防災・実務ツール・国際開発・研究等)を
  意識して絞る。目安は6〜10件程度

追記後にcommit・pushすれば、次回の自動実行(または`gh workflow run weekly-refresh.yml`での
手動実行)で`docs/index.md`に反映される。

## 判断に迷ったら

大きな判断(特定プロジェクトを外す・新しい観点で再構成する等)は、
[UNopenGIS/7#996](https://github.com/UNopenGIS/7/issues/996)のコメントで示した内容との
整合性を意識すること。
