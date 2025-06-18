cách dùng docker cho reactJS

1. build dự án : docker build -t <Name Project> .
2. run dự án : docker run -d -p 5173:5173 --name <tên dự án hiển thị trên docker dashboard> <Name Project>

3. build dự án : docker build -t nawa .
4. run dự án : docker run -d -p 5173:5173 --name nawa-app nawa

để xóa một image trong docker cần làm

1. docker stop containID
2. docker rm containID
