# FoundationZurbTips - 01

> A feature block that would be great for services, user profile, or even company profiles.

#### Using .SSCS
```sh
.service {
	width: 100%;
	height: 320px;
	margin: 80px 0;
	text-align: center;
	border: 1px solid #ddd;
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
  
  .service-icon-box {
    position: relative;
    top: 100px;
    display: inline-block;
    margin-bottom: 40px;
    padding: 10px;
    background: white;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  
  .service-heading {
    position: relative;
    top: 80px;
    -webkit-transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .service-description {
    width: 80%;
    margin: 0 auto;
    opacity: 0;
    -webkit-transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
  }
  
  .service-icon-box > img.service-icon {
	  width: 40px;
  }

  &:hover {
	  border-color: #00a8ff;
  }
  
  &:hover .service-icon-box {
	  top: -30px;
  }
  
  &:hover .service-heading {
	  top: -30px;
  }
  
  &:hover .service-description {
    opacity: 1;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}
```