export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)')
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, props = {}) => {
  const internalProps = { ...props };
  let { expires } = internalProps;

  if (expires && typeof expires == 'number') {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = internalProps.expires = d;
  }

  if (expires && expires.toUTCString) {
    internalProps.expires = expires.toUTCString();
  }

  const encodedValue = encodeURIComponent(value);

  let updatedCookie = `${name}=${encodedValue}`;

  for (const propName in internalProps) {
    updatedCookie += `; ${propName}`;
    const propValue = internalProps[propName];

    if (propValue !== true) {
      updatedCookie += `= ${propValue}`;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1 });
};
