#!/bin/bash
# Generate PDFs from Marp presentations for lectures 3-7

cd /mnt/c/Projects/learning/python-big-data

echo "🎨 Generating PDFs from Marp presentations..."
echo ""

lectures=(
    "wyk3-spark-sql-dataframes-intermediate"
    "wyk4-intro-ml-data-preparation-intermediate"
    "wyk5-mllib-spark-ml-intermediate"
    "wyk6-cloud-computing-spark-gcp-intermediate"
    "wyk7-spark-streaming-intermediate"
)

for lecture in "${lectures[@]}"; do
    echo "📄 Processing $lecture..."
    npx -y @marp-team/marp-cli@latest \
        "presentations/$lecture.md" \
        --pdf \
        --allow-local-files \
        -o "website/static/pdfs/$lecture.pdf"
    
    if [ $? -eq 0 ]; then
        echo "✓ Generated $lecture.pdf"
        ls -lh "website/static/pdfs/$lecture.pdf"
    else
        echo "✗ Failed to generate $lecture.pdf"
    fi
    echo ""
done

echo "✓ PDF generation complete!"
echo ""
echo "Generated PDFs:"
ls -lh website/static/pdfs/wyk*.pdf
