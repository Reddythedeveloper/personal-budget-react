import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import D3Chart from '../D3Chart/D3Chart';


ChartJS.register(ArcElement, Tooltip, Legend);

function Homepage() {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/budget.json');
        const budgetData = response.data.myBudget;
        const formattedData = {
          labels: budgetData.map(item => item.title),
          datasets: [
            {
              label: [],
              data: budgetData.map(item => item.budget),
              backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#836AF9',
                '#a05d56',
                '#d0743c',
              ],
              borderColor: '#ffffff',
              borderWidth: 1,
            },
          ],
        };
        
        setChartData(formattedData);

      } catch (error) {
        console.error("There was an error fetching the budget data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="center" id="main">
      <div className="page-area">
        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they live happier lives... since they spend without guilt or fear...
            because they know it is all good and accounted for.
          </p>
        </article>

        <article>
          <h1>Free</h1>
          <p>
            This app is free!!! And you are the only one holding your data!
          </p>
        </article>

        <article>
          <h1>Chart</h1>
          <div style={{ width: '350px', margin: 'auto' }}>
            {chartData ? (
              <Pie data={chartData} />
            ) : (
              <p>Loading chart data...</p>
            )}
          </div>
        </article>

        <article>
          <D3Chart />
        </article>
      </div>
    </main>
  );
}

export default Homepage;