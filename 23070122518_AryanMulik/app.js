const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

const newsFeeds = [
    {
        id: 1,
        title: "Kubernetes 1.30 Released with New Features",
        category: "Technology",
        date: "2024-11-01",
        summary: "The latest Kubernetes release includes enhanced security features and improved scalability."
    },
    {
        id: 2,
        title: "Cloud Native Computing Reaches New Heights",
        category: "Cloud",
        date: "2024-11-02",
        summary: "Organizations worldwide are adopting cloud-native technologies at an unprecedented rate."
    },
    {
        id: 3,
        title: "DevOps Best Practices for 2024",
        category: "DevOps",
        date: "2024-11-03",
        summary: "Learn the top DevOps practices that are transforming software development workflows."
    },
    {
        id: 4,
        title: "Microservices Architecture Trends",
        category: "Architecture",
        date: "2024-11-04",
        summary: "Exploring the latest trends in microservices design and implementation strategies."
    }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Newsfeed App</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    padding: 20px;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                header {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    margin-bottom: 30px;
                    text-align: center;
                }
                h1 {
                    color: #667eea;
                    font-size: 2.5em;
                    margin-bottom: 10px;
                }
                .subtitle {
                    color: #666;
                    font-size: 1.1em;
                }
                .pod-info {
                    background: rgba(255,255,255,0.9);
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    text-align: center;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .pod-info strong {
                    color: #764ba2;
                }
                .news-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 25px;
                }
                .news-card {
                    background: white;
                    border-radius: 15px;
                    padding: 25px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                }
                .news-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.25);
                }
                .news-category {
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.85em;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
                .news-title {
                    color: #333;
                    font-size: 1.4em;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                .news-date {
                    color: #999;
                    font-size: 0.9em;
                    margin-bottom: 15px;
                }
                .news-summary {
                    color: #666;
                    line-height: 1.6;
                }
                .status-bar {
                    background: rgba(255,255,255,0.9);
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                .status-item {
                    text-align: center;
                }
                .status-value {
                    font-size: 2em;
                    font-weight: bold;
                    color: #667eea;
                }
                .status-label {
                    color: #666;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                    <h1>📰 Newsfeed App</h1>
                    <p class="subtitle">Your Source for Tech News & Updates</p>
                </header>
                
                <div class="pod-info">
                    <strong>Pod:</strong> ${process.env.HOSTNAME || 'localhost'} | 
                    <strong>NodePort:</strong> 30007 | 
                    <strong>Status:</strong> ✅ Running
                </div>

                <div class="status-bar">
                    <div class="status-item">
                        <div class="status-value">${newsFeeds.length}</div>
                        <div class="status-label">Total Articles</div>
                    </div>
                    <div class="status-item">
                        <div class="status-value">4</div>
                        <div class="status-label">Categories</div>
                    </div>
                    <div class="status-item">
                        <div class="status-value">100%</div>
                        <div class="status-label">Uptime</div>
                    </div>
                </div>

                <div class="news-grid" id="newsGrid"></div>
            </div>

            <script>
                const newsData = ${JSON.stringify(newsFeeds)};
                const grid = document.getElementById('newsGrid');
                
                newsData.forEach(news => {
                    const card = document.createElement('div');
                    card.className = 'news-card';
                    card.innerHTML = \`
                        <span class="news-category">\${news.category}</span>
                        <h2 class="news-title">\${news.title}</h2>
                        <p class="news-date">📅 \${news.date}</p>
                        <p class="news-summary">\${news.summary}</p>
                    \`;
                    grid.appendChild(card);
                });
            </script>
        </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        pod: process.env.HOSTNAME || 'localhost',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Newsfeed App running on port ${PORT}`);
    console.log(`📦 Pod: ${process.env.HOSTNAME || 'localhost'}`);
    console.log(`🚀 Access via NodePort: 30007`);
});