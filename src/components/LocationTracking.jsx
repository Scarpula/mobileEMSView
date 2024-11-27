import React, { useState } from 'react'
import Sidebar from './Sidebar'
import MapModal from './MapModal'
import './CommonStyles.css'

const LocationTracking = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const batteryData = [
        { id: "B0001", name: "이동형배터리-01", soc: 85, status: "정상", location: "나주시 봉황면", coordinates: "34.967856,126.791524" },
        { id: "B0002", name: "이동형배터리-02", soc: 72, status: "정상", location: "서울시 서초구", coordinates: "37.4858, 127.0153" },
        { id: "B0003", name: "이동형배터리-03", soc: 45, status: "충전필요", location: "서울시 송파구", coordinates: "37.5145, 127.1058" },
        { id: "B0004", name: "이동형배터리-04", soc: 93, status: "정상", location: "서울시 마포구", coordinates: "37.5563, 126.9228" },
        { id: "B0005", name: "이동형배터리-05", soc: 28, status: "충전필요", location: "서울시 영등포구", coordinates: "37.5208, 126.9141" },
        { id: "B0006", name: "이동형배터리-06", soc: 67, status: "정상", location: "서울시 강서구", coordinates: "37.5509, 126.8497" },
        { id: "B0007", name: "이동형배터리-07", soc: 88, status: "정상", location: "서울시 용산구", coordinates: "37.5384, 126.9654" },
        { id: "B0008", name: "이동형배터리-08", soc: 52, status: "점검필요", location: "서울시 성동구", coordinates: "37.5635, 127.0365" },
        { id: "B0009", name: "이동형배터리-09", soc: 76, status: "정상", location: "서울시 광진구", coordinates: "37.5385, 127.0823" },
        { id: "B0010", name: "이동형배터리-10", soc: 31, status: "충전필요", location: "서울시 동대문구", coordinates: "37.5744, 127.0395" },
    ]

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = batteryData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(batteryData.length / itemsPerPage)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [isMapModalOpen, setIsMapModalOpen] = useState(false)

    const handleRowClick = (battery) => {
        setSelectedLocation(battery)
        setIsMapModalOpen(true)
    }

    return (
        <div className='content-container'>
            <div className='card navbar'>
                <div className='nav-title'>
                    <i className='fas fa-map-marker-alt'></i>
                    <span>위치추적</span>
                    <button 
                        className="sidebar-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div className='nav-account'>
                <div class='round admin'>
                        <span style={{ fontSize : '20px' , fontWeight: '700', color: 'white' }}>관</span>
                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='card table-container'>
                    <div className='table-wrapper'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>배터리 이름</th>
                                    <th>SOC (%)</th>
                                    <th>현재 상태</th>
                                    <th>위치</th>
                                    <th>위도/경도</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((battery) => (
                                    <tr 
                                        key={battery.id}
                                        onClick={() => handleRowClick(battery)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{battery.id}</td>
                                        <td>{battery.name}</td>
                                        <td style={{ fontWeight: '500', color: 'gray' }}>{battery.soc}%</td>
                                        <td>{battery.status}</td>
                                        <td>{battery.location}</td>
                                        <td>{battery.coordinates}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            이전
                        </button>
                        <span className="page-info">{currentPage} / {totalPages}</span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            다음
                        </button>
                    </div>
                </div>
            </div>
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)}
            />
            <MapModal 
                isOpen={isMapModalOpen}
                onClose={() => setIsMapModalOpen(false)}
                location={selectedLocation?.location}
                coordinates={selectedLocation?.coordinates}
                batteryInfo={{
                    name: selectedLocation?.name,
                    soc: selectedLocation?.soc,
                    status: selectedLocation?.status
                }}
            />
        </div>
    )
}

export default LocationTracking