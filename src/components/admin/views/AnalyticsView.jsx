import React from "react";
import { useApp } from "../../../context/AppContext";
import { INITIAL_ANALYTICS } from "../../../data/seedData";
import {
  BarChart2,
  TrendingUp,
  Eye,
  Smartphone,
  Store,
  UtensilsCrossed,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function AnalyticsView() {
  const { restaurants, stats } = useApp();

  // Sort restaurants by views
  const sortedRestaurants = [...restaurants].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));

  // Collect all items across restaurants and sort
  const allItems = [];
  restaurants.forEach((r) => {
    (r.items || []).forEach((item) => {
      allItems.push({
        ...item,
        restaurantName: r.name,
        // Approximate item popularity based on restaurant views & featured status
        estViews: Math.round((r.viewsCount || 100) * (item.featured ? 0.35 : 0.15))
      });
    });
  });
  const topItems = allItems.sort((a, b) => b.estViews - a.estViews).slice(0, 5);

  return (
    <div className="admin-view-content analytics-view">
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Menu Views & Traffic Analytics</h2>
          <p className="view-subtitle">
            Track customer menu page views, most viewed restaurants, top dishes, and mobile device distributions.
          </p>
        </div>

        <div className="analytics-notice-pill">
          <ShieldCheck size={14} className="text-coral" />
          <span>Metrics recorded as verified customer menu page requests</span>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="metrics-grid-4">
        <div className="metric-card">
          <span className="metric-label">TOTAL MENU PAGE VIEWS</span>
          <div className="metric-value">{stats.totalViews.toLocaleString()}</div>
          <div className="metric-sub text-green">
            <TrendingUp size={13} /> +18.4% vs previous 30 days
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-label">ESTIMATED DAILY VIEWS</span>
          <div className="metric-value">480 / day</div>
          <div className="metric-sub">Peak dining hours: 7 PM - 10 PM</div>
        </div>

        <div className="metric-card">
          <span className="metric-label">MOBILE SHARE</span>
          <div className="metric-value">89%</div>
          <div className="metric-sub">iOS Safari & Android Chrome</div>
        </div>

        <div className="metric-card">
          <span className="metric-label">ACTIVE PROFILES SCANNED</span>
          <div className="metric-value">{stats.activeRestaurants}</div>
          <div className="metric-sub">100% of live menus receiving traffic</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="admin-grid-2-col">
        {/* Daily Views Bar Chart */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Daily Menu Page Views</h3>
              <p className="card-sub">Daily customer page loads across the platform</p>
            </div>
            <span className="trend-badge positive">Live Data</span>
          </div>

          <div className="chart-bars-wrap tall">
            {INITIAL_ANALYTICS.dailyViews.map((item) => {
              const maxVal = 1000;
              const barHeightPct = Math.round((item.views / maxVal) * 100);

              return (
                <div key={item.day} className="chart-bar-col">
                  <span className="chart-bar-val">{item.views}</span>
                  <div className="chart-bar-track">
                    <div
                      className="chart-bar-fill"
                      style={{ height: `${barHeightPct}%` }}
                      title={`${item.views} views on ${item.day}`}
                    />
                  </div>
                  <span className="chart-bar-label">{item.day}</span>
                </div>
              );
            })}
          </div>

          <p className="chart-note-text">
            * Labeled as customer menu page views. Reflects direct URL visits and camera scans.
          </p>
        </div>

        {/* Device Breakdown */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Device & Browser Distribution</h3>
              <p className="card-sub">Customer viewing environments</p>
            </div>
            <Smartphone size={18} className="text-coral" />
          </div>

          <div className="device-breakdown-list">
            {INITIAL_ANALYTICS.deviceBreakdown.map((d) => (
              <div key={d.device} className="device-row">
                <div className="device-info-row">
                  <span className="device-name">{d.device}</span>
                  <strong>{d.percentage}%</strong>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="card-hint-box mt-6">
            <h4>Optimization Insight:</h4>
            <p>
              Over 89% of guests browse on mobile smartphones while seated. DineEQR is optimized specifically for sub-second mobile rendering.
            </p>
          </div>
        </div>
      </div>

      {/* Top Restaurants & Top Dishes Row */}
      <div className="admin-grid-2-col mt-6">
        {/* Most Viewed Restaurants */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Most Viewed Restaurants</h3>
              <p className="card-sub">Ranked by total menu traffic</p>
            </div>
            <Store size={18} className="text-coral" />
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>Category</th>
                  <th>Total Views</th>
                </tr>
              </thead>
              <tbody>
                {sortedRestaurants.map((r, i) => (
                  <tr key={r.id}>
                    <td>
                      <div className="table-rest-cell">
                        <span className="rank-num">#{i + 1}</span>
                        <span className="rest-avatar-sm">{r.logo || "🍽️"}</span>
                        <strong>{r.name}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag-cell">{r.category}</span>
                    </td>
                    <td>
                      <strong className="dish-price-text">{(r.viewsCount || 0).toLocaleString()}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Viewed Dishes */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Top Viewed Menu Dishes</h3>
              <p className="card-sub">Estimated dish views based on menu engagement</p>
            </div>
            <UtensilsCrossed size={18} className="text-coral" />
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Dish</th>
                  <th>Restaurant</th>
                  <th>Est. Views</th>
                </tr>
              </thead>
              <tbody>
                {topItems.map((dish, i) => (
                  <tr key={`${dish.restaurantName}-${dish.id}`}>
                    <td>
                      <div className="table-rest-cell">
                        <span className="rank-num">#{i + 1}</span>
                        <div>
                          <strong>{dish.name}</strong>
                          <small className="text-coral font-bold">₹{dish.price}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="rest-link-tag">{dish.restaurantName}</span>
                    </td>
                    <td>
                      <strong>{dish.estViews}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
