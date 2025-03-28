CREATE TABLE address_contacts (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    phone VARCHAR(20),
	name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20) NOT NULL,	
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    address_id INTEGER REFERENCES address_contacts(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL
);




ALTER TABLE legal_entities 
    ADD COLUMN pan VARCHAR(100) ,
    ADD COLUMN tan VARCHAR(100) ,
    ADD COLUMN udyam_number VARCHAR(100),
    ADD COLUMN ie VARCHAR(100) ;

    ALTER TABLE legal_entities ALTER COLUMN pan SET NOT NULL;
ALTER TABLE legal_entities ALTER COLUMN tan SET NOT NULL;
ALTER TABLE legal_entities ALTER COLUMN udyam_number SET NOT NULL;
ALTER TABLE legal_entities ALTER COLUMN ie SET NOT NULL;


SELECT * FROM legal_entities WHERE tan IS NULL;


UPDATE legal_entities SET ie = 'UNKNOWN' WHERE ie IS NULL;


CREATE TABLE listed (
    id SERIAL PRIMARY KEY,
    legalcompany VARCHAR(100) NOT NULL,
    legalstock VARCHAR(255) NOT NULL
    
);



ALTER TABLE legal_entities drop listed;
ALTER TABLE legal_entities drop stock_exchange;


CREATE TABLE registration (
    id SERIAL PRIMARY KEY,
    gstn VARCHAR(15) NOT NULL UNIQUE,
    state VARCHAR(100) NOT NULL
);

CREATE TABLE bankDetails (
    id SERIAL PRIMARY KEY,
    accountNumber VARCHAR(200) NOT NULL UNIQUE,
    accountType VARCHAR(100) NOT NULL,
    bankName VARCHAR(100) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    ifsc VARCHAR(100) NOT NULL,
    swift VARCHAR(100) NOT NULL
);

DROP TABLE legal_entities;

CREATE TABLE legal_entities (
    legal_entity_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    cin VARCHAR(50) NOT NULL,
    website VARCHAR(255),
    pan VARCHAR(100) NOT NULL,
    tan VARCHAR(100) NOT NULL,
    udyam_number VARCHAR(100),
    ie VARCHAR(100)
);


CREATE TABLE contract (
    contractId SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parentId VARCHAR(255) NOT NULL,
    pariyojana VARCHAR(255) NOT NULL,
    sector VARCHAR(255) NOT NULL,
    state VARCHAR(255),  -- Nullable
    contractType VARCHAR(255),  -- Nullable
    contractModel VARCHAR(255),  -- Nullable
    startdate DATE,  -- Nullable
    enddate DATE  -- Nullable
);
