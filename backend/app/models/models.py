from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    street_address = Column(String, nullable=False)
    current_winning_bid = Column(Float, nullable=False)
    last_bid_difference = Column(Float, nullable=False)
    market_value = Column(Float, nullable=False)  # New column for market value
    reservation_price = Column(Float, nullable=False)  # New column for reservation price
    images = relationship("PropertyImage", back_populates="property")

class PropertyImage(Base):
    __tablename__ = "property_images"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    image_url = Column(String, nullable=False)
    property = relationship("Property", back_populates="images")

class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)  # "outbid", "active", "winning"