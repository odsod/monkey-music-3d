var images = {};
images['monkey'] = new Image();
images['monkey'].src = 'data:image/png;base64,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';
exports['monkey'] = new THREE.Texture(images['monkey']);
exports['monkey'].needsUpdate = true;
exports['monkey'].magFilter = THREE.NearestFilter;
images['skin'] = new Image();
images['skin'].src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAMAAACVQ462AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAHxALIxcJJBgIJBgKJhgLJhoKJxsLJhoMKBsKKBsLKBoNKBwLKRwMKh0NKx4NKx4OLR0OLB4OLx8PLB4RLyANLSAQLyIRMiMQMyQRNCUSOigUPyoVKCgoPz8/JiFbMChyAFtbAGBgAGhoAH9/Qh0KQSEMRSIOQioSUigmUTElYkMvbUMqb0UsakAwdUcvdEgvek4za2trOjGJUj2JRjqlVknMAJmZAJ6eAKioAK+vAMzMikw9gFM0hFIxhlM0gVM5g1U7h1U7h1g6ilk7iFo5j14+kF5Dll9All9BmmNEnGNFnGNGmmRKnGdIn2hJnGlMnWpPlm9bnHJcompHrHZaqn1ms3titXtnrYBttIRttolsvohst4Jyu4lyvYtyvY5yvY50xpaA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPSUN6AAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAKjSURBVEhLpZSLVtNAEIYLpSlLSUITLCBaGhNBQRM01M2mSCoXNUURIkZFxQvv/wz6724Wij2HCM7J6UyS/b+dmZ208rsww6jiqo4FhannZb5yDqjaNgDVwE/8JAmCMqF6fwGwbU0CKjD/+oAq9jcM27gxAFpNQxU3Bwi9Ajy8fgmGZuvaGAcIuwFA12CGce1jJESr6/Ot1i3Tnq5qptFqzet1jRA1F2XHWQFAs3RzwTTNhQd3rOkFU7c0DijmohRg1TR9ZmpCN7/8+PX954fb+sTUjK7VLKOYi1IAaTQtUrfm8pP88/vTw8M5q06sZoOouSgHEDI5vrO/eHK28el04yxf3N8ZnyQooZiLfwA0arNb6d6bj998/+vx8710a7bW4E2Uc1EKsEhz7WiQBK9eL29urrzsB8ngaK1JLDUXpYAkGSQH6e7640fL91dWXjxZ33138PZggA+Sz0WQlAL4gmewuzC1uCenqXevMPWc9XrMX/VXh6Hicx4ByHEeAfRg/wtgSMAvz+CKEkYAnc5SpwuD4z70PM+hUf+4348ixF7EGItjxmQcCx/Dzv/SOkuXAF3PdT3GIujjGLELNYwxhF7M4oi//wsgdlYZdMXCmEUUSsSu0OOBACMoBTiu62BdRPEjYxozXFyIpK7IAE0IYa7jOBRqGlOK0BFq3Kdpup3DthFwP9QDlBCGKEECoHEBEDLAXHAQMQnI8jwFYRQw3AMOQAJoOADoAVcDAh0HZAKQZUMZdC43kdeqAPwUBEsC+M4cIEq5KEEBCl90mR8CVR3nxwCdBBS9OAe020UGnXb7KcxzPY9SXoEEIBZtgE7UDgBKyLMhgBS2YdzjMJb4XHRDAPiQhSGjNOxKQIZTgC8BiMECgarxprjjO0OXiV4MAf4A/x0nbcyiS5EAAAAASUVORK5CYII=';
exports['skin'] = new THREE.Texture(images['skin']);
exports['skin'].needsUpdate = true;
exports['skin'].magFilter = THREE.NearestFilter;