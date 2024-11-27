import React, { useEffect } from 'react'
import './MapModal.css'

const MapModal = ({ isOpen, onClose, location, coordinates, batteryInfo }) => {
    useEffect(() => {
        if (isOpen && window.kakao) {
            const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()))
            
            const container = document.getElementById('map')
            const options = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 3
            }
            
            const map = new window.kakao.maps.Map(container, options)
            
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng)
            })
            
            marker.setMap(map)
            
            const iwContent = `
                <div style="padding:10px;">
                    <div style="font-weight:500;margin-bottom:4px;">${batteryInfo.name}</div>
                    <div style="color:#666;">SOC: ${batteryInfo.soc}%</div>
                </div>
            `
            
            const infowindow = new window.kakao.maps.InfoWindow({
                content: iwContent
            })
            
            infowindow.open(map, marker)
        }
    }, [isOpen, coordinates, location, batteryInfo])

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>배터리 위치</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div id="map" style={{ width: '100%', height: '300px' }}></div>
                <div className="battery-info-section">
                    <h4>배터리 정보</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">이름:</span>
                            <span className="info-value">{batteryInfo.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">위치:</span>
                            <span className="info-value">{location}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">상태:</span>
                            <span className="info-value">{batteryInfo.status}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">SOC(%):</span>
                            <span className="info-value">{batteryInfo.soc}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapModal